interface common {
  className?: string;
  children: React.ReactNode;
}

declare interface CardProps {
  common: common;
  variant?: "default" | "elevated";
}

declare interface CardTitleProps {
  common: common;
}

declare interface CardDescriptionProps {
  common: common;
}

declare interface CardContentProps {
  common: common;
}
