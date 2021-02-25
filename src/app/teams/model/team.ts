import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  ITeam: ITeam;
}

export interface ITeamsData {
  teams: ITeam[];
  isLoading: boolean;
}

export interface ITeamData {
  isLoading: boolean;
  team: ITeam;
}

export interface ITeam {
  last_match_time: number;
  logo_url: string;
  losses: number;
  name: string;
  rating: number;
  tag: string;
  team_id: number;
  wins: number;
}
