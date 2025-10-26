import { CurrencyText } from "shared/components/CurrencyText/CurrencyText";
import { formatCurrency } from "shared/utils/number.utils";
import "./SummaryCard.css";

interface SummaryCardProps {
    icon?: React.ReactNode;
    amount: number;
    variant: "success" | "danger" | "primary";
}

export default function SummaryCard({
    icon,
    amount,
    variant,
}: SummaryCardProps) {
    return (
        <div className="summary-card-neumorphic mb-3">
            <div className="text-center d-flex flex-row gap-3 align-items-center">
                {icon && <div className={`icon-container text-${variant}`}>{icon}</div>}
                <h1 className={`font-weight-bold text-${variant}`} style={{ fontSize: "50px", marginTop: "8px" }}>
                    <CurrencyText slashClassName="currency-slash" />
                    {formatCurrency(amount)}
                </h1>
            </div>
        </div>
    );
}