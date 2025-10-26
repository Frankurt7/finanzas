import "./CurrencyText.css";

interface CurrencyTextProps {
    className?: string;
    slashClassName?: string;
}

export const CurrencyText = ({
    className,
    slashClassName,
}: CurrencyTextProps) => {
    return (
        <span className={className}>
      S<span className={slashClassName ?? "currency-slash"}>/</span>{" "}
        </span>
    );
};