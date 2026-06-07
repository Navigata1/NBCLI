# Homebrew formula TEMPLATE for NBCLI.
#
# This is ready to publish on the FIRST release: fill in `url` (the npm tarball or a GitHub
# release tarball) and `sha256`, then tap it. It is intentionally a template because @nsb/cli
# has not been published yet (see CAPABILITY_ASSESSMENT.md). Until then, install via:
#   npm i -g @nsb/cli
class Nbcli < Formula
  desc "NorthStar Bootstrap CLI — governed autonomy for AI-native development"
  homepage "https://github.com/Navigata1/NBCLI"
  # url "https://registry.npmjs.org/@nsb/cli/-/cli-2.11.0.tgz"
  # sha256 "TODO_ON_FIRST_RELEASE"
  license "MIT"
  depends_on "node"

  def install
    system "npm", "install", "-g", "--prefix=#{libexec}", "@nsb/cli@#{version}"
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/nsb --version")
  end
end
