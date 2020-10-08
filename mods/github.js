import serveBadge from "../helpers/serve-badge";
import cachedExecute from "../helpers/cached-execute";

export function queryGithub(query) {
  const headers = {
    authorization: `token ${pickGithubToken()}`,
    accept: "application/vnd.github.hawkgirl-preview+json",
  };
  const json = { query };
  const url = ghGraphQLURL;
  return fetch(url, { method: "POST", json, headers }).json();
}

function pickGithubToken() {
  const { GH_TOKENS, GITHUB_TOKENS } = process.env;
  const githubTokens = GITHUB_TOKENS || GH_TOKENS;
  if (!githubTokens) {
    throw new BadgenError({ status: "token required" });
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
  const topic = parts[1];

  // TODO: validate pathname
  const owner = parts[2];
  const repo = parts[3];

  switch (topic) {
    case "release":
      const info = await queryRepoStats({ topic, owner, repo });
      return serveBadge({
        subject: "releases",
        status: info.releases.totalCount,
        color: "blue",
      });
    case "tag":
      break;
    default:
      return serveBadge({
        subject: "travis",
        status: "unknown",
        color: "grey",
      });
  }
}

export default handleGitHub;
