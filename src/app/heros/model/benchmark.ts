import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  IBenchmark: IBenchmark;
}

export interface IBenchmarkData {
  isLoading: boolean;
  benchmark: IBenchmark;
}

export interface IBenchmark {
  hero_id: number;
  result: IResults;
}

export interface IResults {
  gold_per_min: IResult[];
  xp_per_min: IResult[];
  kills_per_min: IResult[];
  last_hits_per_min: IResult[];
  hero_damage_per_min: IResult[];
  hero_healing_per_min: IResult[];
  tower_damage: IResult[];
  stuns_per_min: IResult[];
  lhten: IResult[];
}

export interface IResult {
  percentile: number;
  value: number;
}
