import * as fromRoot from '../../../model/app';

export interface IAppState extends fromRoot.IAppState {
  ICosmetic: ICosmetic;
}

export interface ICosmetic {
  item_id: number;
  name: string;
  prefab: string;
  creation_date: string;
  image_inventory: string;
  image_path: string;
  item_description: string;
  item_name: string;
  item_rarity: string;
  item_type_name: string;
  used_by_heroes: string;
}
