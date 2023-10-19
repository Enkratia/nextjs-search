import React from "react";

import Item from "./components/Item";

import getWikiResults from "../../lib/getWikiResults";

type SearchPageProps = {
  params: {
    searchTerm: string;
  };
};

export const generateMetadata = async ({ params: { searchTerm } }: SearchPageProps) => {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;

  const displayTerm = searchTerm.replace(/(%20|%)/g, "");

  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} Not Found`,
    };
  }

  return {
    title: displayTerm,
    description: `Search results for ${displayTerm}`,
  };
};

const SearchResults: React.FC<SearchPageProps> = async ({ params: { searchTerm } }) => {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;

  const results: Result[] | undefined = data?.query?.pages;

  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {results ? (
        Object.values(results).map((result) => {
          return <Item key={result.pageid} result={result} />;
        })
      ) : (
        <h2 className="p-2 text-xl">{`${searchTerm} Not Found`}</h2>
      )}
    </main>
  );

  return content;
};

export default SearchResults;
