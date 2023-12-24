import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isShowAdditionalMenu, setIsShowAdditionalMenu] = useState(true);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsPWAInstalled(false);
    });

    window.addEventListener("appinstalled", () => {
      setIsPWAInstalled(true);
    });
  }, [deferredPrompt]);

  const toggleFullSceen = (): void => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const promptInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <main className={inter.className}>
        {isShowAdditionalMenu && !isPWAInstalled && (
          <div className="flex h-12 w-full items-center justify-between bg-black py-3 text-sm text-black transition duration-500 animate-in slide-in-from-top-full ">
            <div className="flex items-center gap-3">
              <span className="mx-5 text-white">Additional Menu</span>
              <button
                onClick={promptInstall}
                className="h-fit rounded-full bg-white px-3 shadow-md"
              >
                Install
              </button>
              <button
                onClick={toggleFullSceen}
                className="h-fit rounded-full bg-white px-3 shadow-md"
              >
                {isFullScreen ? "Esc" : "Fullscreen"}
              </button>
            </div>
            <button
              onClick={() => setIsShowAdditionalMenu(false)}
              className="mx-3 h-6 w-6 items-center rounded-full border border-white text-center text-white"
            >
              x
            </button>
          </div>
        )}
        <Component {...pageProps} />
      </main>
    </>
  );
}
