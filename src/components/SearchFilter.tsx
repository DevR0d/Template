import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

type FilterOption = {
  id: string;
  label: string;
};

type SearchFilterProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
  filters?: FilterOption[];
  onFilterChange?: (selectedFilters: string[]) => void;
};

const SearchFilter: React.FC<SearchFilterProps> = ({
  placeholder = 'Search...',
  onSearch,
  filters = [],
  onFilterChange,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  const toggleFilter = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    
    setSelectedFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center w-full">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={handleClear}
              >
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {filters.length > 0 && (
            <div className="relative ml-2">
              <button
                type="button"
                className={`p-2 border border-gray-300 rounded-md focus:outline-none ${
                  selectedFilters.length > 0 
                    ? 'bg-blue-50 border-blue-300 text-blue-500' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter size={16} />
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                  <div className="px-3 py-2 border-b">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Filters
                    </p>
                  </div>
                  <div className="py-1">
                    {filters.map((filter) => (
                      <label
                        key={filter.id}
                        className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedFilters.includes(filter.id)}
                          onChange={() => toggleFilter(filter.id)}
                        />
                        {filter.label}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;