import { AggregatesDataPoint } from './aggregatesData';

export type AggregateSort = {
  direction: 'ascending' | 'descending' | 'none';
  dataType: keyof AggregatesDataPoint;
};
