export type AggregatesDataPoint = {
    // The trading volume of the symbol in the given time period.
    v: number;

    // The volume weighted average price.
    vw: number;

    // The open price for the symbol in the given time period.
    o: number;

    // The close price for the symbol in the given time period.
    c: number;

    // The highest price for the symbol in the given time period.
    h: number;

    // The lowest price for the symbol in the given time period.
    l: number;

    // The Unix Msec timestamp for the start of the aggregate window.
    t: number;

    // The number of transactions in the aggregate window.
    n: number;
}

export type AggregatesData = {
    ticker: string;
    queryCount: number;
    resultsCount: number;
    adjusted: boolean;
    results: AggregatesDataPoint[];
}