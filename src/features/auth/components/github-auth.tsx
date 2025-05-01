import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/github-icon";
import { authClient } from "@/lib/auth-client";

export function GithubAuthButton() {
  async function signWithGithub() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: '/dashboard'
    });
  }

  return (
    <Button
      onClick={signWithGithub}
      variant="outline"
      className="w-full cursor-pointer"
    >
      <GitHubIcon />
      Continue with GitHub
    </Button>
  );
}
