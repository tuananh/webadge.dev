import config from "../config";
import badgen from "../helpers/badge";

const topicMap = {
  releases: "releases",
  tags: "refs",
  watchers: "watchers",
  stars: "stargazers",
  forks: "forks",
  issues: "issues",
  "open-issues": "issues",
  "closed-issues": "issues",
  prs: "pullRequests",
  "open-prs": "pullRequests",
  "closed-prs": "pullRequests",
  "merged-prs": "pullRequests",
};

async function restGithub(path, preview = "hellcat") {
  const headers = {
    authorization: `token ${GITHUB_TOKEN}`,
    accept: `application/vnd.github.${preview}-preview+json`,
    "User-Agent": "Awesome-Octocat-App",
  };
  const resp = await fetch(config.githubApiUrl + path, { headers });
  return resp.json();
}

async function queryGithub(query) {
  const headers = {
    authorization: `token ${GITHUB_TOKEN}`,
    accept: "application/vnd.github.hawkgirl-preview+json",
    "User-Agent": "Awesome-Octocat-App",
    "Content-Type": "application/json",
  };
  const json = { query };
  const resp = await fetch(config.githubGraphqlUrl, {
    method: "POST",
    body: JSON.stringify(json),
    headers,
  });
  return resp.json();
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

async function getLatestRelease({ owner, repo, channel }) {
  const releases = await restGithub(`repos/${owner}/${repo}/releases`);

  if (!releases || !releases.length) {
    return {
      subject: "release",
      status: "none",
      color: "yellow",
    };
  }

  const [latest] = releases;
  const stable = releases.find((release) => !release.prerelease);
  switch (channel) {
    case "stable":
      return {
        subject: "release",
        status: stable ? stable.name || stable.tag_name : null,
        color: "blue",
      };
    default:
      return {
        subject: "release",
        status: latest.name || latest.tag_name,
        color: latest.prerelease ? "orange" : "blue",
      };
  }
}

async function handleGitHub({ topic, owner, repo }, options) {
  switch (topic) {
    case "releases":
    case "tags":
    case "stars":
    case "prs":
    case "open-prs":
    case "closed-prs":
    case "merged-prs":
    case "issues":
    case "open-issues":
    case "closed-issues":
    case "forks":
    case "watchers":
      const info = await queryRepoStats({ topic, owner, repo });
      return badgen(
        {
          subject: topic,
          status: String(info[topicMap[topic]].totalCount),
          color: "blue",
        },
        options
      );
    case "release":
      const opts = await getLatestRelease({ owner, repo, channel: "stable" });
      return badgen(opts, options);
    default:
      return badgen(
        {
          subject: topic,
          status: "unknown",
          color: "grey",
        },
        options
      );
  }
}

export default handleGitHub;
