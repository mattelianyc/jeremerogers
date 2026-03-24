import Link from "next/link";
import styles from "./Footer.module.css";

function getClassName(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

export function Footer({
  useDefaultStyles = true,
  className = "",
  innerClassName = "",
  topGridClassName = "",
  brandBlockClassName = "",
  eyebrowClassName = "",
  brandNameClassName = "",
  brandDescriptionClassName = "",
  socialBlockClassName = "",
  socialLabelClassName = "",
  socialLinkClassName = "",
  bottomRowClassName = "",
  copyrightClassName = "",
  brandNameContent
}) {
  return (
    <footer className={getClassName(useDefaultStyles ? styles.footer : "", className)}>
      <div className={getClassName(useDefaultStyles ? styles.inner : "", innerClassName)}>
        <div className={getClassName(useDefaultStyles ? styles.topGrid : "", topGridClassName)}>
          <div
            className={getClassName(
              useDefaultStyles ? styles.brandBlock : "",
              brandBlockClassName
            )}
          >
            <h2
              className={getClassName(
                "brand-wordmark",
                useDefaultStyles ? styles.brandName : "",
                brandNameClassName
              )}
            >
              {brandNameContent ?? "ALMO SEBASTIAN"}
            </h2>
            <p
              className={getClassName(
                useDefaultStyles ? styles.brandDescription : "",
                brandDescriptionClassName
              )}
            >
              Minimal ready-to-wear, objects, and expression pieces presented with a
              quiet luxury point of view.
            </p>
          </div>
        </div>

        <div className={getClassName(useDefaultStyles ? styles.bottomRow : "", bottomRowClassName)}>
          <p className={getClassName(useDefaultStyles ? styles.copyright : "", copyrightClassName)}>
            &copy; 2026 ALMO SEBASTIAN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
