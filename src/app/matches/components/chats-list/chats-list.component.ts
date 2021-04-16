import { Component, Input, OnInit } from '@angular/core';
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IChat } from '../../model/onematch';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent implements OnInit {
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;
  @Input() chatWheelLocal: any;
  @Input() data: any[];
  @Input() chats: IChat[];

  finalData;
  chatFilterObj = {
    radient: {
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
    radient: {
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
    this.finalData = this.chats;
    this.chatFilter = Object.keys(this.chatFilterObj);
    this.chatFilterObjFinalabc = this.calFilterDataLength(this.chats, this.chatFilterObjFinalabc);
  }

  // play audio
  playAudio(item: any): any {
    const audio = new Audio(`https://odota.github.io/media/chatwheel/dota_chatwheel_${item?.key}.${this.chatWheelLocal[item?.key]?.sound_ext}`);
    audio.play();
  }

  // filter chart
  filter(e): any {
    this.chatFilterObj[e.source.name].isShown = e.checked;
    this.chatFilterObj = {
      ...this.chatFilterObj,
      ...this.chatFilterObj[e.source.name],
    };
    this.finalData = this.extraceData(this.chats, this.chatFilterObj);
    this.chatFilterObj = this.calFilterDataLength(this.finalData, this.chatFilterObj);
  }

  calFilterDataLength(data: any[], keys: any): any {
    keys.radient.len = data.filter(i => {
      return i.player_slot < 128;
    }).length;
    keys.dire.len =  data.filter(i => {
      return i.player_slot > 127 ;
    }).length;
    keys.chat.len =  data.filter(i => {
      return i.type === 'chat' ;
    }).length;
    keys.pharses.len =  data.filter(i => {
      return i.type === 'chatwheel' && !this.chatWheelLocal[i?.key].sound_ext ;
    }).length;
    keys.audio.len =  data.filter(i => {
      return i.type === 'chatwheel' && this.chatWheelLocal[i?.key].sound_ext ;
    }).length;
    keys.all.len =  data.filter(i => {
      return i.type === 'chat' || (i.type === 'chatwheel' && this.chatWheelLocal[i?.key].all_chat);
    }).length;
    keys.allies.len =  data.filter(i => {
      return i.type === 'chatwheel' && !this.chatWheelLocal[i?.key].all_chat;
    }).length;
    keys.spam.len =  data.filter((i, index) => {
      return index >= 1
      && (i.time === data[index - 1].time)
      && (i.player_slot === data[index - 1].player_slot)
      && (i.key === data[index - 1].key);
    }).length;
    return keys;
  }

  // filter chat data function
  extraceData(data: any[], keys: any): any[] {
    data = data.filter((i, index) => {
      // side
      const radient = i.player_slot < 128;
      const dire = i.player_slot > 127;

      // type
      const chat = i.type === 'chat';
      const pharses = (i.type === 'chatwheel' && !this.chatWheelLocal[i?.key].sound_ext);
      const audio = (i.type === 'chatwheel' && this.chatWheelLocal[i?.key].sound_ext);

      // target
      const all = i.type === 'chat' || (i.type === 'chatwheel' && this.chatWheelLocal[i?.key].all_chat);
      const allies = i.type === 'chatwheel' && !this.chatWheelLocal[i?.key].all_chat;

      // spam
      const spam = index >= 1
      && (i.time === data[index - 1].time)
      && (i.player_slot === data[index - 1].player_slot)
      && (i.key === data[index - 1].key);

      // sides,
      if ((keys.radient.isShown && keys.dire.isShown) || (!keys.radient.isShown && !keys.dire.isShown) ) {
        // types
        if ((keys.chat.isShown && keys.pharses.isShown && keys.audio.isShown)
        || (!keys.chat.isShown && !keys.pharses.isShown && !keys.audio.isShown)) {
          // target
          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {
            // spam
            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && i.type && (all || allies) && !spam;
            }
            return (i.player_slot >= 0) && i.type && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && i.type && all && !spam;
            }
            return (i.player_slot >= 0) && i.type && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && i.type && allies && !spam;
            }
            return (i.player_slot >= 0) && i.type && allies;
          }
        } else if (keys.chat.isShown && !keys.pharses.isShown && !keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && chat && (all || allies) && !spam;
            }
            return (i.player_slot >= 0) && chat && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && chat && all && !spam;
            }
            return (i.player_slot >= 0) && chat && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && chat && allies && !spam;
            }
            return (i.player_slot >= 0) && chat && allies;
          }
        } else if (keys.chat.isShown && keys.pharses.isShown && !keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && (chat || pharses) && (all || allies) && !spam;
            }
            return (i.player_slot >= 0) && (chat || pharses) && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && (chat || pharses) && all && !spam;
            }
            return (i.player_slot >= 0) && (chat || pharses) && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && (chat || pharses) && allies && !spam;
            }
            return (i.player_slot >= 0) && (chat || pharses) && allies;
          }
        } else if (keys.chat.isShown && !keys.pharses.isShown && keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && (chat || audio) && (all || allies) && !spam;
            }
            return (i.player_slot >= 0) && (chat || audio) && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && (chat || audio) && all && !spam;
            }
            return (i.player_slot >= 0) && (chat || audio) && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && (chat || audio) && allies && !spam;
            }
            return (i.player_slot >= 0) && (chat || audio) && allies;
          }
        } else if (!keys.chat.isShown && keys.pharses.isShown && keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && (pharses || audio) && (all || allies) && !spam;
            }
            return (i.player_slot >= 0) && (pharses || audio) && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && (pharses || audio) && all && !spam;
            }
            return (i.player_slot >= 0) && (pharses || audio) && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && (pharses || audio) && allies && !spam;
            }
            return (i.player_slot >= 0) && (pharses || audio) && allies;
          }
        } else if (!keys.chat.isShown && keys.pharses.isShown && !keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && pharses && (all || allies) && !spam;
            }
            return (i.player_slot >= 0) && pharses && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && pharses && all && !spam;
            }
            return (i.player_slot >= 0) && pharses && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && pharses && allies && !spam;
            }
            return (i.player_slot >= 0) && pharses && allies;
          }
        } else if (!keys.chat.isShown && !keys.pharses.isShown && keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && audio && (all || allies) && !spam;
            }
            return (i.player_slot >= 0) && audio && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && audio && all && !spam;
            }
            return (i.player_slot >= 0) && audio && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return (i.player_slot >= 0) && audio && allies && !spam;
            }
            return (i.player_slot >= 0) && audio && allies;
          }
        }
      } else if (keys.radient.isShown && !keys.dire.isShown) {

        if ((keys.chat.isShown && keys.pharses.isShown && keys.audio.isShown)
        || (!keys.chat.isShown && !keys.pharses.isShown && !keys.audio.isShown)) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return radient && i.type && (all || allies) && !spam;
            }
            return radient && i.type && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && i.type && all && !spam;
            }
            return radient && i.type && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && i.type && allies && !spam;
            }
            return radient && i.type && allies;
          }
        } else if (keys.chat.isShown && !keys.pharses.isShown && !keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return radient && chat && (all || allies) && !spam;
            }
            return radient && chat && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && chat && all && !spam;
            }
            return radient && chat && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && chat && allies && !spam;
            }
            return radient && chat && allies;
          }
        } else if (keys.chat.isShown && keys.pharses.isShown && !keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return radient && (chat || pharses) && (all || allies) && !spam;
            }
            return radient && (chat || pharses) && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && (chat || pharses) && all && !spam;
            }
            return radient && (chat || pharses) && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && (chat || pharses) && allies && !spam;
            }
            return radient && (chat || pharses) && allies;
          }
        } else if (keys.chat.isShown && !keys.pharses.isShown && keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return radient && (chat || audio) && (all || allies) && !spam;
            }
            return radient && (chat || audio) && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && (chat || audio) && all && !spam;
            }
            return radient && (chat || audio) && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && (chat || audio) && allies && !spam;
            }
            return radient && (chat || audio) && allies;
          }
        } else if (!keys.chat.isShown && keys.pharses.isShown && keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return radient && (pharses || audio) && (all || allies) && !spam;
            }
            return radient && (pharses || audio) && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && (pharses || audio) && all && !spam;
            }
            return radient && (pharses || audio) && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && (pharses || audio) && allies && !spam;
            }
            return radient && (pharses || audio) && allies;
          }
        } else if (!keys.chat.isShown && keys.pharses.isShown && !keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return radient && pharses && (all || allies) && !spam;
            }
            return radient && pharses && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && pharses && all && !spam;
            }
            return radient && pharses && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && pharses && allies && !spam;
            }
            return radient && pharses && allies;
          }
        } else if (!keys.chat.isShown && !keys.pharses.isShown && keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return radient && audio && (all || allies) && !spam;
            }
            return radient && audio && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && audio && all && !spam;
            }
            return radient && audio && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return radient && audio && allies && !spam;
            }
            return radient && audio && allies;
          }
        }
      } else if (!keys.radient.isShown && keys.dire.isShown) {
        if ((keys.chat.isShown && keys.pharses.isShown && keys.audio.isShown)
        || (!keys.chat.isShown && !keys.pharses.isShown && !keys.audio.isShown)) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return dire && i.type && (all || allies) && !spam;
            }
            return dire && i.type && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && i.type && all && !spam;
            }
            return dire && i.type && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && i.type && allies && !spam;
            }
            return dire && i.type && allies;
          }
        } else if (keys.chat.isShown && !keys.pharses.isShown && !keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return dire && chat && (all || allies) && !spam;
            }
            return dire && chat && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && chat && all && !spam;
            }
            return dire && chat && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && chat && allies && !spam;
            }
            return dire && chat && allies;
          }
        } else if (keys.chat.isShown && keys.pharses.isShown && !keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return dire && (chat || pharses) && (all || allies) && !spam;
            }
            return dire && (chat || pharses) && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && (chat || pharses) && all && !spam;
            }
            return dire && (chat || pharses) && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && (chat || pharses) && allies && !spam;
            }
            return dire && (chat || pharses) && allies;
          }
        } else if (keys.chat.isShown && !keys.pharses.isShown && keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return dire && (chat || audio) && (all || allies) && !spam;
            }
            return dire && (chat || audio) && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && (chat || audio) && all && !spam;
            }
            return dire && (chat || audio) && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && (chat || audio) && allies && !spam;
            }
            return dire && (chat || audio) && allies;
          }
        } else if (!keys.chat.isShown && keys.pharses.isShown && keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return dire && (pharses || audio) && (all || allies) && !spam;
            }
            return dire && (pharses || audio) && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && (pharses || audio) && (all || allies) && !spam;
            }
            return dire && (pharses || audio) && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && (pharses || audio) && allies && !spam;
            }
            return dire && (pharses || audio) && allies;
          }
        } else if (!keys.chat.isShown && keys.pharses.isShown && !keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return dire && pharses && (all || allies) && !spam;
            }
            return dire && pharses && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && pharses && all && !spam;
            }
            return dire && pharses && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && pharses && allies && !spam;
            }
            return dire && pharses && allies;
          }
        } else if (!keys.chat.isShown && !keys.pharses.isShown && keys.audio.isShown) {

          if ((keys.all.isShown && keys.allies.isShown) || (!keys.all.isShown && !keys.allies.isShown)) {

            if (!keys.spam.isShown) {
              return dire && audio && (all || allies) && !spam;
            }
            return dire && audio && (all || allies);
          } else if (keys.all.isShown && !keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && audio && all && !spam;
            }
            return dire && audio && all;
          } else if (!keys.all.isShown && keys.allies.isShown) {

            if (!keys.spam.isShown) {
              return dire && audio && allies && !spam;
            }
            return dire && audio && allies;
          }
        }
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
