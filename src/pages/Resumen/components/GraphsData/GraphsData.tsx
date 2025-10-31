import "./GraphsData.css";
import { GastosLineChart } from "./GastosLineChart";

export const GraphsData = () => {
    return (
        <div className="pb-2">
            <h4>Evolución</h4>
            <GastosLineChart />
        </div >
    );
};