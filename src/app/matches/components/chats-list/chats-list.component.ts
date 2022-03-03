import { Component, Input, OnInit } from '@angular/core';
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IChat } from '../../model/onematch';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent implements OnInit {
  @Input() playerColors: any;
  @Input() heroes: IheroLocal;
  @Input() chatWheel: any;
  @Input() data: any[];
  @Input() chats: IChat[];

  finalData;
  finalData2 = [];
  chatFilterObj = {
    radiant: {
      isShown: true,
      len: 0
    },
    dire: {
      isShown: true,
      len: 0
    },
    chat: {
      isShown: true,
      len: 0
    },
    pharses: {
      isShown: true,
      len: 0
    },
    audio: {
      isShown: true,
      len: 0
    },
    all: {
      isShown: true,
      len: 0
    },
    allies: {
      isShown: true,
      len: 0
    },
    spam: {
      isShown: true,
      len: 0
    },
  };

  chatFilter = [];

  chatFilterObjFinalabc = {
    radiant: {
      isShown: true,
      len: 0
    },
    dire: {
      isShown: true,
      len: 0
    },
    chat: {
      isShown: true,
      len: 0
    },
    pharses: {
      isShown: true,
      len: 0
    },
    audio: {
      isShown: true,
      len: 0
    },
    all: {
      isShown: true,
      len: 0
    },
    allies: {
      isShown: true,
      len: 0
    },
    spam: {
      isShown: true,
      len: 0
    },
  };

  constructor() { }

  ngOnInit(): void {
    this.extractData(this.chats);
    this.finalData = this.chats; // matches.chats
    this.chatFilter = Object.keys(this.chatFilterObj);
    this.chatFilterObjFinalabc = this.calFilterDataLength(this.chats, this.chatFilterObjFinalabc);
  }

  // play audio
  playAudio(item: any): any {
    const audio = new Audio(`https://odota.github.io/media/chatwheel/dota_chatwheel_${item?.key}.${this.chatWheel[item?.key]?.sound_ext}`);
    audio.play();
  }

  // filter chart
  filter(e): any {
    this.chatFilterObj[e.source.name].isShown = e.checked;
    this.chatFilterObj = {
      ...this.chatFilterObj,
      ...this.chatFilterObj[e.source.name],
    };
    this.finalData = this.extraceData(this.finalData2, this.chatFilterObj);
    this.chatFilterObj = this.calFilterDataLength(this.finalData, this.chatFilterObj);
  }


  calFilterDataLength(data: any[], keys: any): any {
    keys.radiant.len = data.filter(i => {
      return i.player_slot < 128;
    }).length;
    keys.dire.len =  data.filter(i => {
      return i.player_slot > 127 ;
    }).length;
    keys.chat.len =  data.filter(i => {
      return i.type === 'chat' ;
    }).length;
    keys.pharses.len =  data.filter(i => {
      return i.type === 'chatwheel' && (!this.chatWheel[i?.key]?.sound_ext || !this.chatWheel[i?.key]);
    }).length;
    keys.audio.len =  data.filter(i => {
      return i.type === 'chatwheel' && this.chatWheel[i?.key]?.sound_ext ;
    }).length;
    keys.all.len =  data.filter(i => {
      return i.type === 'chat' || (i.type === 'chatwheel' && this.chatWheel[i?.key]?.all_chat);
    }).length;
    keys.allies.len =  data.filter(i => {
      return i.type === 'chatwheel' && !this.chatWheel[i?.key]?.all_chat;
    }).length;
    keys.spam.len =  data.filter((i, index) => {
      return index >= 1
      && (i.time === data[index - 1].time)
      && (i.player_slot === data[index - 1].player_slot)
      && (i.key === data[index - 1].key);
    }).length;
    return keys;
  }


  extractData(data): any[] {
    // [
    //   {
    //     "time": 1710,
    //     "type": "chat",
    //     "key": "基地",
    //     "slot": 6,
    //     "player_slot": 129
    //   },
    //   {
    //     "time": 1561,
    //     "type": "chatwheel",
    //     "key": "71",
    //     "slot": 4,
    //     "player_slot": 4
    //   }
    // ]
    data.forEach((i, index) => {
      const { player_slot } = i;

      // side
      const side = player_slot < 128 ? 'radiant' : 'dire';

      // type
      let chatType = '';
      if (i.type === 'chat') {
        chatType = 'chat';
      } else if (i.type === 'chatwheel' && (!this.chatWheel[i?.key]?.sound_ext || !this.chatWheel[i?.key])) {
        chatType = 'pharses';
      } else if (i.type === 'chatwheel' && this.chatWheel[i?.key]?.sound_ext) {
        chatType = 'audio';
      }

      // target
      let targetType = '';
      if (i.type === 'chat' || (i.type === 'chatwheel' && this.chatWheel[i?.key]?.all_chat)) {
        targetType = 'all';
      } else if (i.type === 'chatwheel' && !this.chatWheel[i?.key]?.all_chat) {
        targetType = 'allies';
      }

      // spam
      const spam = index >= 1
      && (i.time === data[index - 1].time)
      && (i.player_slot === data[index - 1].player_slot)
      && (i.key === data[index - 1].key);

      this.finalData2.push({
        ...i,
        side,
        chat_type: chatType,
        target_type: targetType,
        spam
        // above is common data for player
      });

    });
    return this.finalData2;
  }

  // filter chat data function
  extraceData(data: any[], keys: any): any[] {
    data = data.filter((i, index) => {
      // // side
      // const radiant = i.player_slot < 128;
      // const dire = i.player_slot > 127;

      // // type
      // const chat = i.type === 'chat';
      // const pharses = i.type === 'chatwheel' && (!this.chatWheel[i?.key]?.sound_ext || !this.chatWheel[i?.key]);
      // const audio = (i.type === 'chatwheel' && this.chatWheel[i?.key]?.sound_ext);

      // // target
      // const all = i.type === 'chat' || (i.type === 'chatwheel' && this.chatWheel[i?.key]?.all_chat);
      // const allies = i.type === 'chatwheel' && !this.chatWheel[i?.key]?.all_chat;

      // // spam
      // const spam = index >= 1
      // && (i.time === data[index - 1].time)
      // && (i.player_slot === data[index - 1].player_slot)
      // && (i.key === data[index - 1].key);
      if (!keys?.spam?.isShown) {
        return (i.spam || !i.spam);
      } else if (keys?.spam?.isShown) {
        return !i.spam;
      }

      if (keys?.radiant?.isShown && !keys?.dire?.isShown) {
        return i.side === 'radiant';
      } else if (!keys?.radiant?.isShown && keys?.dire?.isShown) {
        return i.side !== 'radiant';
      } else if ((!keys?.radiant?.isShown && !keys?.dire?.isShown) || (keys?.radiant?.isShown && keys?.dire?.isShown)) {
        return i.side === 'radiant' || i.side === 'dire';
      }

      // if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {
      //   return (all || allies);
      // } else if (keys.all.isShown && !keys.allies.isShown) {
      //   return all;
      // } else if (!keys.all.isShown && keys.allies.isShown) {
      //   return allies;
      // }
    });
    return data;
  }

}
