//y data points are in this order: Open Price, Highest, Lowest, Close
export type AggregateChartData = {
    x: Date,
    y: number[],
    linearPoint: number
}