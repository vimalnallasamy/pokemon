import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

// In app imports
import "./PokemonCard.scss";
import AppConstants from "../../constants/app.constants";

function PokemonCard({
  id,
  name,
  height,
  base_experience,
  sprites,
  moves,
  onClose,
}) {
  return (
    <div className="pokemon-card-wrapper">
      <span className="close-icon" onClick={() => onClose(id)}>
        <AiOutlineCloseCircle />
      </span>
      <div className="poke-image-wrapper">
        <img src={sprites.other.dream_world.front_default} alt={name} />
      </div>
      <div className="pokemon-details-wrapper">
        <div className="poke-name">
          <span>{name}</span>
        </div>
        <div className="poke-height">
          {AppConstants.PokemonCard.heightLabel} : {height}
        </div>
        <div className="poke-exp">
          {AppConstants.PokemonCard.baseExp} : {base_experience}
        </div>
        <div className="poke-moves">
          {AppConstants.PokemonCard.moves} :
          {moves &&
            moves.map((move) => {
              if (move.move) {
                return (
                  <span key={move.move.name}>{`${move.move.name}, `}</span>
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
