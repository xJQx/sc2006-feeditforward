import React, { useState } from "react";
import { SearchBar } from "../SearchBar";
import { GoDotFill } from "react-icons/go";
import { simpleSearch } from "../../utils/search";
import { Hawker } from "../../utils/schema";
import { ModalCloseButton } from "./ModalCloseButton";

interface MapHawkerSearchModalProps {
  hawkersList: Hawker[];
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHawkerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHawkerSelected: React.Dispatch<React.SetStateAction<Hawker | undefined>>;
}

export const MapHawkerSearchModal = (props: MapHawkerSearchModalProps) => {
  const {
    hawkersList,
    isSearchModalOpen,
    setIsSearchModalOpen,
    setIsHawkerModalOpen,
    setHawkerSelected
  } = props;
  const [hawkersFiltered, setHawkersFiltered] = useState<Hawker[]>([]);

  const handleHawkersSearch = (searchKey: string) => {
    // Simple Search
    const filteredHawker = simpleSearch(hawkersList, searchKey, [
      "business_name",
      "operatingHours",
      "address",
      "foodType"
    ]);

    setHawkersFiltered(filteredHawker);
  };
  const handleFilteredHawkerOnClick = (hawker: Hawker) => {
    setHawkerSelected(hawker);
    setIsHawkerModalOpen(true);
  };

  return (
    <>
      {isSearchModalOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] px-4 py-3 rounded bg-[#E3F6F5]">
          {/* Title */}
          <div className="text-center mb-1">Search Hawkers</div>

          {/* Close Button */}
          <ModalCloseButton setIsModalOpen={setIsSearchModalOpen} />

          {/* Search Bar */}
          <SearchBar
            searchItemPlaceholder="hawkers..."
            handleSearch={handleHawkersSearch}
            className="text-[12px] !p-[6px] !border bg-white"
          />
          {/* Results */}
          {hawkersFiltered.length > 0 && (
            <div className="max-h-[25vh] overflow-scroll mt-2 text-[14px]">
              <div className="underline">Results</div>
              <div className="flex flex-col gap-1">
                {hawkersFiltered.map(hawker => (
                  <div
                    key={`${hawker.hawker_id}-${hawker.business_name}`}
                    className="flex"
                    onClick={() => handleFilteredHawkerOnClick(hawker)}
                  >
                    <span>
                      <GoDotFill className="w-[10px] h-[10px] translate-y-[5px]" />
                    </span>
                    &nbsp;
                    <span>{hawker.business_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
