import { Tab, Tabs } from "react-bootstrap";
import "./GraphsData.css";
import { TopCategoriasBarChart } from "../TopCategoriasBarChart/TopCategoriasBarChart";
import { GastosLineChart } from "./GastosLineChart";

export const GraphsData = () => {
    return (
        <div  className="pb-2">
            <h4>Gráficos</h4>
            <Tabs defaultActiveKey="evolucion" id="graficos-tabs" className="mb-3 mt-4 neumorphic-tabs">
                <Tab eventKey="evolucion" title="Evolución">
                    <GastosLineChart />
                </Tab>
                <Tab eventKey="top-gastos" title="Top Categorías">
                    <TopCategoriasBarChart />
                </Tab>
            </Tabs>
        </div >
    );
};