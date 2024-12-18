import React from "react";
import { type Figure } from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: React.FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map((figure) => (
        <div className="" key={figure.id}>
          {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo} />}
        </div>
      ))}
    </div>
  );
};

export default LostFigures;
