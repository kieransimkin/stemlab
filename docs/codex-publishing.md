# Codex and MCP distribution

StemLab provides **audio timing analysis and finds loopable sections for creating
Shorts and other short-form videos**. This guide separates a distributable local
plugin, an MCP registry listing and OpenAI's reviewed public directory.

## Release automation included in this patch

The existing `.github/workflows/release.yml` remains the release authority. A
`vX.Y.Z` tag must match `src/stemlab/__init__.py`; no version/tag is created here.
Ordinary pushes to `main` run checks, not publication. Manual workflow dispatch
builds/validates but does not publish without a tag ref. Stable x.y.z versions are
currently required by the plugin builder; prerelease tag support is not implied.

The workflow calls `codex-plugin.yml`, tests the local bridge and actual MCP v2
stdio protocol on Ubuntu and Windows, checks manifests, and produces:

```text
stemlab-codex-plugin-X.Y.Z.zip
stemlab-codex-plugin-X.Y.Z.zip.sha256
stemlab-mcp-server.json
```

Portable and compatibility manifest versions plus the archive runtime requirement
are set from the Python source version at build time. The checked-in plugin
scaffold version is not a separate release stream. The archive contains the
marketplace catalog, manifests, skills, licence and documentation; it does not
contain Python, audio, model weights or machine-specific paths. The Python wheel
contains `stemlab.codex`; the sdist includes the plugin source and build scripts.
Users must install the matching Python runtime and configure an explicit workspace.

The main release job downloads those tested assets before computing the release
manifest/checksums, then attaches them to the same GitHub Release as the wheel and
sdist. After the GitHub and PyPI publication jobs succeed, `codex-marketplace`
updates only a dedicated **codex-plugins** branch. That branch contains a small
Codex marketplace and plugin folder, not the repository's audio/demo assets.
It refuses to downgrade an already-newer channel and pushes without force.
Branch protections remain effective; configure an allowed policy for this one
release branch rather than weakening protection on `main`.

To opt out of that channel push, set the repository Actions variable
`CODEX_MARKETPLACE_PUBLISH=false`. Archive building/upload to GitHub Releases
remains enabled. No additional personal access token is needed for the channel;
only that release job has `contents: write`.

After the first successful release-channel publication:

```bash
codex plugin marketplace add kieransimkin/stemlab --ref codex-plugins
codex plugin marketplace list
codex plugin marketplace upgrade stemlab-releases
```

Install/enable StemLab through the supported local plugin directory. Refreshing
the marketplace does not upgrade an external Python environment: install the
matching requirement in `plugins/stemlab/RUNTIME.json`, then restart the MCP server.
The released command still requires a configured workspace and a discoverable
`stemlab-codex` executable. See [setup](codex-plugin.md).

Publication is a same-workflow dependency, not a second workflow that relies on
`release: published` events created by `GITHUB_TOKEN`. GitHub suppresses most
follow-on workflow events from that token. No Codex cache or user account is
modified by GitHub Actions.

## OpenAI public Plugins Directory

The automated Git marketplace channel above is **not** publication to OpenAI's
universal public directory. The documented public process is submission through
the developer portal, review, approval and an explicit publish step. This patch
does not invent an upload endpoint or an `OPENAI_API_KEY`-based publishing action.

The local stdio package is built for local Codex hosts. Do not present it as a
hosted ChatGPT connector. A public MCP-backed portal submission has remote-server
requirements; a hosted version would need a separately designed authenticated
service and an explicit audio-privacy model. A skills-only public submission is
also a distinct route and is not automatically performed here.

## Official MCP Registry: prepared, disabled by default

Recommended registry identity: `io.github.kieransimkin/stemlab`.
Underlying package: `danceflow-stemlab` on PyPI. This preserves StemLab's canonical
name rather than creating another competing Python package. The registry stores
server/distribution metadata; the Python files remain on PyPI.

`mcp-registry/server.json` is the source template. The builder writes a version-matched
`stemlab-mcp-server.json`. The root README contains the exact ownership marker
`mcp-name: io.github.kieransimkin/stemlab` in an HTML comment, retained in the PyPI
long description. The manifest advertises local stdio transport and a required
`STEMLAB_CODEX_WORKSPACE`, not an invented public HTTP endpoint.

For generic clients the executable alias matches the distribution name. The
registry launch pattern is equivalent to:

```bash
# Use the version in the release metadata, not the unreleased example below.
uvx --with 'mcp>=2.2,<3' danceflow-stemlab@X.Y.Z serve
```

Set `STEMLAB_CODEX_WORKSPACE` to an absolute existing directory first. The separate
`--with` installs the transport dependency only. This installs StemLab's full core
dependencies but not every optional analysis backend; a dedicated preinstalled
`[codex,all]` environment is recommended for repeated model inference. Hosts differ
in how they interpret registry launch metadata. Test the advertised command in the
target host before the first public submission; registry publication is not a
universal client-compatibility certification.

To enable automated submission after reviewing the metadata:

1. Create the GitHub Environment **mcp-registry**, preferably with a required reviewer.
2. Set repository Actions variable **MCP_REGISTRY_PUBLISH=true**.
3. Set **MCP_PUBLISHER_VERSION** to a reviewed upstream publisher release tag and
   **MCP_PUBLISHER_SHA256** to the SHA-256 of its `mcp-publisher_linux_amd64.tar.gz`.
   Obtain/verify these from the official MCP Registry release; do not use a random
   binary or disable the hash check to make a failed release pass.

The workflow's `mcp-registry` job runs only on version tags, after the package and
GitHub release have succeeded. It verifies the exact PyPI version and ownership
marker, downloads the pinned publisher with checksum verification, authenticates
with `mcp-publisher login github-oidc`, and calls `mcp-publisher publish`. GitHub
OIDC requires `id-token: write` but no long-lived MCP secret. Read-back verifies the
published name and version. Matching existing metadata is treated as an idempotent
retry; a different immutable version is an error, not an overwrite.

This repository has not been submitted by preparing the patch. Published MCP
Registry metadata is immutable; current documentation also notes preview status
and no general unpublish operation. Review names, description, package version,
launch requirements and licences before enabling the first publication.

## Other directories

| Destination | Recommended route for StemLab |
|---|---|
| **Glama** | Submit the GitHub repository and description as an open-source server. Authenticate as a maintainer. Indexing/build/tool scans are separate from the official registry. |
| **PulseMCP** | Submit via its directory form; it also ingests the official registry and performs curation. No auto-acceptance or immediate listing is guaranteed. |
| **Smithery** | Its local stdio distribution route accepts a pre-built `.mcpb` bundle; alternatively a separately hosted Streamable HTTP server. Our Codex ZIP is **not** MCPB and must not merely be renamed. MCPB packaging and Smithery submission are not implemented here. |

Recommended order: PyPI release plus Codex Git marketplace, official MCP Registry,
then Glama/PulseMCP discovery. Consider Smithery after building and testing a real
MCPB adapter with dependency/runtime requirements appropriate for local audio/GPU
work. Listing does not require uploading private source audio or redistributing
third-party model weights.

## Local validation and honest limits

```bash
python scripts/build_codex_plugin.py --check
python scripts/build_codex_plugin.py --release-tag vX.Y.Z
python -m pytest tests/test_codex_package.py tests/test_codex_release.py
```

Archive byte reproducibility is checked within the same Python/compression runtime;
byte-for-byte equality across different compression-library versions is not claimed.
The tests verify structure, versions, checksums, safe extraction, dependency order
and publication gating. They do not contact a live registry, create a public listing
or execute a GitHub release workflow. The official publisher performs registry-side
validation at submission. Upstream specification changes can require a new patch.

## Sources checked 29 September 2026

- [OpenAI plugin packaging / local Git marketplaces](https://developers.openai.com/plugins/build/plugins)
- [OpenAI plugin submission and publication](https://developers.openai.com/plugins/deploy/submission)
- [Official MCP Registry supported package types and ownership verification](https://modelcontextprotocol.io/registry/package-types)
- [Official MCP Registry GitHub Actions / OIDC](https://modelcontextprotocol.io/registry/github-actions)
- [Official MCP Registry version immutability / FAQ](https://modelcontextprotocol.io/registry/faq)
- [Glama submissions](https://glama.ai/mcp/faq)
- [PulseMCP directory ingestion](https://www.pulsemcp.com/api)
- [Smithery local MCPB and hosted-server publishing](https://smithery.ai/docs/build/publish)
- [GitHub workflow event behaviour](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow)

- [uv tool invocation, extras and version selection](https://docs.astral.sh/uv/guides/tools/)
