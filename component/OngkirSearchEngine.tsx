"use client"
import React, { useState } from 'react';
import styled from 'styled-components';
import { searchSubdistrict } from '@/ongkirDbFunctions';

interface SearchResult {
  subdistrictId: number;
  subdistrictName: string;
  cityId: number;
  cityName: string;
  provinceId: number;
  provinceName: string;
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
  }
`;

const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export function OngkirSearchEngine() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;

    setIsLoading(true);
    try {
      const searchResults = await searchSubdistrict(searchTerm);
      // @ts-ignore
      setResults(searchResults);
    } catch (error) {
      console.error('Error searching for subdistrict:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search for subdistrict..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </SearchButton>
      </SearchContainer>

      {results.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ResultsTable>
            <thead>
              <tr>
                <TableHeader>Subdistrict</TableHeader>
                <TableHeader>City</TableHeader>
                <TableHeader>Province</TableHeader>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.subdistrictId}>
                  <TableCell>{result.subdistrictName}</TableCell>
                  <TableCell>{result.cityName}</TableCell>
                  <TableCell>{result.provinceName}</TableCell>
                </tr>
              ))}
            </tbody>
          </ResultsTable>
        </div>
      )}
    </Container>
  );
}
