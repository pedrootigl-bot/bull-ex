"use client";

import { HERO_COPY } from "@/components/hero/heroConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import {
  ACCOUNT_STEPS,
  ACCOUNT_STEPS_COPY,
  isAccountStepIndex,
  type AccountStepId,
  type AccountStepIndex,
} from "./accountStepsConfig";
import styles from "./accountSteps.module.css";

function StepIcon({ step }: { step: AccountStepId }) {
  switch (step) {
    case "register":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M7 23c0-3.9 3.1-7 7-7s7 3.1 7 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M20 8v4M18 10h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "verify":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M14 4.5 6.5 8v6.2c0 4.2 3.2 7.2 7.5 8.8 4.3-1.6 7.5-4.6 7.5-8.8V8L14 4.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="m10.2 13.6 2.4 2.4 5.2-5.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "start":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M14 5.5c3.2 2.8 6.5 4.2 10 4.5-1.2 4.8-3.8 8.2-7.8 10.2-1.4.7-2.2.7-3.5 0C8.7 18.2 6.1 14.8 5 10c3.5-.3 6.8-1.7 10-4.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M14 5.5v14.7M11.5 9.5 14 5.5l2.5 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default: {
      const exhaustive: never = step;
      return exhaustive;
    }
  }
}

function StepConnector({ active }: { active: boolean }) {
  return (
    <div className={styles.connector} aria-hidden="true">
      <span className={styles.connectorLine} />
      <span className={`${styles.connectorDot} ${active ? styles.connectorDotActive : ""}`} />
      <span className={styles.connectorLine} />
    </div>
  );
}

type AccountStepCardProps = {
  step: AccountStepId;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  id?: string;
  interactive?: boolean;
  onSelect?: () => void;
};

function AccountStepCard({
  step,
  index,
  isActive,
  isCompleted,
  id,
  interactive = false,
  onSelect,
}: AccountStepCardProps) {
  const t = useTranslations("accountSteps");
  const className = `${styles.card} ${isActive ? styles.cardActive : ""} ${isCompleted ? styles.cardCompleted : ""}`;

  const content = (
    <>
      <div className={styles.cardHead}>
        <span className={styles.stepNumber}>{index + 1}</span>
        <span className={styles.stepPill}>{t(`steps.${step}.checkpoint`)}</span>
      </div>

      <div className={styles.cardIcon}>
        <StepIcon step={step} />
      </div>

      <h3 className={styles.cardTitle}>{t(`steps.${step}.title`)}</h3>
      <p className={styles.cardText}>{t(`steps.${step}.text`)}</p>
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        id={id}
        className={className}
        aria-current={isActive ? "step" : undefined}
        onClick={onSelect}
      >
        {content}
      </button>
    );
  }

  return (
    <article id={id} className={className} aria-current={isActive ? "step" : undefined}>
      {content}
    </article>
  );
}

export function AccountStepsSection() {
  const t = useTranslations("accountSteps");
  const reducedMotion = useReducedMotion();
  const baseId = useId();
  const [activeStep, setActiveStep] = useState<AccountStepIndex>(0);

  function handleCardClick(index: number) {
    if (!isAccountStepIndex(index)) {
      return;
    }
    setActiveStep(index);
  }

  function handleNext() {
    if (activeStep < 2) {
      setActiveStep((current) => (current + 1) as AccountStepIndex);
    }
  }

  const isLastStep = activeStep === 2;

  return (
    <section
      className={styles.section}
      id={ACCOUNT_STEPS_COPY.id}
      aria-labelledby={`${baseId}-title`}
    >
      <div className={styles.decorTop} aria-hidden="true" />
      <div className={styles.decorBottom} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title} id={`${baseId}-title`}>
            {t("title")}
          </h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

        <div
          className={styles.mobileCarousel}
          role="region"
          aria-label={t("progressLabel")}
          aria-live="polite"
        >
          <div
            className={`${styles.mobileTrack} ${reducedMotion ? styles.mobileTrackStatic : ""}`}
            style={{ transform: `translateX(-${activeStep * 100}%)` }}
          >
            {ACCOUNT_STEPS.map((step, index) => {
              const stepIndex = index as AccountStepIndex;

              return (
                <div className={styles.mobileSlide} key={step}>
                  <AccountStepCard
                    step={step}
                    index={index}
                    isActive
                    isCompleted={stepIndex < activeStep}
                    id={`${baseId}-mobile-step-${step}`}
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.mobileDots} aria-hidden="true">
            {ACCOUNT_STEPS.map((step, index) => (
              <span
                key={step}
                className={`${styles.mobileDot} ${index === activeStep ? styles.mobileDotActive : ""}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.cardsRow} role="list" aria-label={t("progressLabel")}>
          {ACCOUNT_STEPS.map((step, index) => {
            const stepIndex = index as AccountStepIndex;
            const isActive = stepIndex === activeStep;
            const isCompleted = stepIndex < activeStep;

            return (
              <div className={styles.cardsRowItem} key={step} role="listitem">
                {index > 0 ? <StepConnector active={isCompleted || isActive} /> : null}
                <AccountStepCard
                  step={step}
                  index={index}
                  isActive={isActive}
                  isCompleted={isCompleted}
                  id={`${baseId}-step-${step}`}
                  interactive
                  onSelect={() => handleCardClick(index)}
                />
              </div>
            );
          })}
        </div>

        <div className={styles.actions}>
          {isLastStep ? (
            <a
              className={styles.primaryButton}
              href={HERO_COPY.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t("cta")}</span>
              <span className={styles.buttonArrow} aria-hidden="true">
                →
              </span>
            </a>
          ) : (
            <button type="button" className={styles.primaryButton} onClick={handleNext}>
              <span>{t("next")}</span>
              <span className={styles.buttonArrow} aria-hidden="true">
                →
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
