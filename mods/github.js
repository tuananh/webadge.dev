import config from "../config";
import serveBadge from "../helpers/serve-badge";
import cachedExecute from "../helpers/cached-execute";

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function queryGithub(query) {
  const headers = {
    authorization: `token ${pickGithubToken()}`,
    accept: "application/vnd.github.hawkgirl-preview+json",
  };
  const json = { query };
  return fetch(ghGraphQLURL, { method: "POST", json, headers }).json();
}

function pickGithubToken() {
  const githubTokens = config.ghTokens;
  if (!githubTokens) {
    throw new Error({ status: "token required" });
  }
  const tokens = githubTokens.split(",").map((segment) => segment.trim());
  return rand(tokens);
}

async function queryRepoStats({ topic, owner, repo, restArgs = {} } = {}) {
  const repoQueryBodies = {
    license: "licenseInfo { spdxId }",
    watchers: "watchers { totalCount }",
    stars: "stargazers { totalCount }",
    forks: "forks { totalCount }",
    issues: "issues { totalCount }",
    "open-issues": "issues(states:[OPEN]) { totalCount }",
    "closed-issues": "issues(states:[CLOSED]) { totalCount }",
    prs: "pullRequests { totalCount }",
    "open-prs": "pullRequests(states:[OPEN]) { totalCount }",
    "closed-prs": "pullRequests(states:[CLOSED, MERGED]) { totalCount }",
    "merged-prs": "pullRequests(states:[MERGED]) { totalCount }",
    branches: 'refs(first: 0, refPrefix: "refs/heads/") { totalCount }',
    releases: "releases { totalCount }",
    tags: 'refs(first: 0, refPrefix: "refs/tags/") { totalCount }',
    tag: `refs(last: 1, refPrefix: "refs/tags/") {
          edges {
            node {
              name
            }
          }
        }`,
  };

  let queryBody;
  switch (topic) {
    case "label-issues":
      const { label, states } = restArgs;
      const issueFilter = states ? `(states:[${states.toUpperCase()}])` : "";
      queryBody = `label(name:"${label}") { color, issues${issueFilter} { totalCount } }`;
      break;
    case "commits":
      queryBody = `
            branch: ref(qualifiedName: "${restArgs.ref || "master"}") {
              target {
                ... on Commit {
                  history(first: 0) {
                    totalCount
                  }
                }
              }
            }
          `;
      break;
    case "last-commit":
      queryBody = `
            branch: ref(qualifiedName: "${restArgs.ref || "master"}") {
              target {
                ... on Commit {
                  history(first: 1) {
                    nodes {
                      committedDate
                    }
                  }
                }
              }
            }
          `;
      break;
    default:
      queryBody = repoQueryBodies[topic];
  }

  if (queryBody) {
    const query = `
          query {
            repository(owner:"${owner}", name:"${repo}") {
              ${queryBody}
            }
          }
        `;

    return queryGithub(query).then((res) => res.data.repository);
  }
}

async function handleGitHub(request) {
  const { pathname } = new URL(request.url);
  const parts = pathname.split("/");
  const topic = parts[2];

  // TODO: validate pathname
  const owner = parts[3];
  const repo = parts[4];
  console.log(topic, owner, repo);
  switch (topic) {
    case "releases":
      const info = await queryRepoStats({ topic, owner, repo });
      return serveBadge({
        subject: "releases",
        status: info.releases.totalCount,
        color: "blue",
      });
    case "stars":
      const info = await queryRepoStats({ topic, owner, repo });
      return serveBadge({
        subject: "stars",
        status: info.stars.totalCount,
        color: "blue",
      });
    default:
      return serveBadge({
        subject: topic,
        status: "unknown",
        color: "grey",
      });
  }
}

export default handleGitHub;
