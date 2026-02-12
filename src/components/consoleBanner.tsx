"use client";

import { useEffect } from "react";
import figlet from "figlet";
import gradient from "gradient-string";
import boxen from "boxen";
import { APP, BANNER_FONTS, BANNER_THEMES } from "@/config/constants";
import { ConsoleBannerProps } from "@/types/propTypes";
import { getRandomItem } from "@/lib/utils/utils";

const systemInfo = (nodeVersion: string) => {
  const info = `
    Node: ${nodeVersion}
    Port: ${process.env.NEXT_PUBLIC_VISUALCORTEX_PORT}
    Mode: ${process.env.NEXT_PUBLIC_NODE_ENV}
    Time: ${new Date().toLocaleString("en-US")}
  `;

  return boxen(info, {
    padding: { top: 0.5, right: 5, bottom: 0.5, left: 0.5 },
    borderColor: "cyan",
    borderStyle: "round",
  });
};

const ConsoleBanner = ({ nodeVersion }: ConsoleBannerProps) => {
  const banner = getRandomItem(BANNER_THEMES);
  const bannerGradient = gradient(banner.gradient);
  const bannerDesc = getRandomItem(BANNER_THEMES);
  const bannerDescGradient = gradient(bannerDesc.gradient);

  useEffect(() => {
    fetch(BANNER_FONTS.ansiShadow.url)
      .then((res) => res.text())
      .then((font) => {
        figlet.parseFont("ANSI Shadow", font);

        figlet.text(
          APP.name.toUpperCase(),
          { font: BANNER_FONTS.ansiShadow.name },
          async (error, data) => {
            if (error) {
              console.warn(
                "⚠️ WARNING :: An error occurred while creating console banner :",
                error,
              );
              return;
            }

            const output = bannerGradient.multiline(data as string);
            const desc = bannerDescGradient.multiline(APP.desc);
            const sysInfo = systemInfo(nodeVersion);

            console.log(`\n${output}\n${desc}\n\n${sysInfo}\n\n`);
            console.log("");
          },
        );
      })
      .catch((err) => {
        console.warn(
          "⚠️ WARNING :: An error occurred while creating console banner :",
          err,
        );
      });
  }, []);

  return null;
};

export default ConsoleBanner;
