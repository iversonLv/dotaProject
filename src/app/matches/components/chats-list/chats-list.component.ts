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
    radient: true,
    dire: true,
    chat: true,
    pharses: true,
    audio: true,
    all: true,
    allies: true,
    spam: true,
  };

  chatFilter = [];

  constructor() { }

  ngOnInit(): void {
    this.finalData = this.chats;
    this.chatFilter = Object.keys(this.chatFilterObj);
  }

  // play audio
  playAudio(item: any): any {
    const audio = new Audio(`https://odota.github.io/media/chatwheel/dota_chatwheel_${item?.key}.${this.chatWheelLocal[item?.key]?.sound_ext}`);
    audio.play();
  }

  // filter chart
  filter(e): any {
    this.chatFilterObj[e.source.name] = e.checked;
    this.chatFilterObj = {
      ...this.chatFilterObj,
      ...this.chatFilterObj[e.source.name],
    };
    console.log(this.chatFilterObj);
    this.finalData = this.extraceData(this.chats, this.chatFilterObj);
  }

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
      if ((keys.radient && keys.dire) || (!keys.radient && !keys.dire) ) {
        // types
        if ((keys.chat && keys.pharses && keys.audio) || (!keys.chat && !keys.pharses && !keys.audio)) {
          // target
          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {
            // spam
            if (!keys.spam) {
              return i.player_slot && i.type && (all || allies) && !spam;
            }
            return i.player_slot && i.type && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return i.player_slot && i.type && all && !spam;
            }
            return i.player_slot && i.type && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return i.player_slot && i.type && allies && !spam;
            }
            return i.player_slot && i.type && allies;
          }
        } else if (keys.chat && !keys.pharses && !keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return i.player_slot && chat && (all || allies) && !spam;
            }
            return i.player_slot && chat && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return i.player_slot && chat && all && !spam;
            }
            return i.player_slot && chat && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return i.player_slot && chat && allies && !spam;
            }
            return i.player_slot && chat && allies;
          }
        } else if (keys.chat && keys.pharses && !keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return i.player_slot && (chat || pharses) && (all || allies) && !spam;
            }
            return i.player_slot && (chat || pharses) && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return i.player_slot && (chat || pharses) && all && !spam;
            }
            return i.player_slot && (chat || pharses) && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return i.player_slot && (chat || pharses) && allies && !spam;
            }
            return i.player_slot && (chat || pharses) && allies;
          }
        } else if (keys.chat && !keys.pharses && keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return i.player_slot && (chat || audio) && (all || allies) && !spam;
            }
            return i.player_slot && (chat || audio) && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return i.player_slot && (chat || audio) && all && !spam;
            }
            return i.player_slot && (chat || audio) && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return i.player_slot && (chat || audio) && allies && !spam;
            }
            return i.player_slot && (chat || audio) && allies;
          }
        } else if (!keys.chat && keys.pharses && keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return i.player_slot && (pharses || audio) && (all || allies) && !spam;
            }
            return i.player_slot && (pharses || audio) && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return i.player_slot && (pharses || audio) && all && !spam;
            }
            return i.player_slot && (pharses || audio) && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return i.player_slot && (pharses || audio) && allies && !spam;
            }
            return i.player_slot && (pharses || audio) && allies;
          }
        } else if (!keys.chat && keys.pharses && !keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return i.player_slot && pharses && (all || allies) && !spam;
            }
            return i.player_slot && pharses && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return i.player_slot && pharses && all && !spam;
            }
            return i.player_slot && pharses && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return i.player_slot && pharses && allies && !spam;
            }
            return i.player_slot && pharses && allies;
          }
        } else if (!keys.chat && !keys.pharses && keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return i.player_slot && audio && (all || allies) && !spam;
            }
            return i.player_slot && audio && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return i.player_slot && audio && all && !spam;
            }
            return i.player_slot && audio && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return i.player_slot && audio && allies && !spam;
            }
            return i.player_slot && audio && allies;
          }
        }
      } else if (keys.radient && !keys.dire) {

        if ((keys.chat && keys.pharses && keys.audio) || (!keys.chat && !keys.pharses && !keys.audio)) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return radient && i.type && (all || allies) && !spam;
            }
            return radient && i.type && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return radient && i.type && all && !spam;
            }
            return radient && i.type && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return radient && i.type && allies && !spam;
            }
            return radient && i.type && allies;
          }
        } else if (keys.chat && !keys.pharses && !keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return radient && chat && (all || allies) && !spam;
            }
            return radient && chat && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return radient && chat && all && !spam;
            }
            return radient && chat && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return radient && chat && allies && !spam;
            }
            return radient && chat && allies;
          }
        } else if (keys.chat && keys.pharses && !keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return radient && (chat || pharses) && (all || allies) && !spam;
            }
            return radient && (chat || pharses) && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return radient && (chat || pharses) && all && !spam;
            }
            return radient && (chat || pharses) && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return radient && (chat || pharses) && allies && !spam;
            }
            return radient && (chat || pharses) && allies;
          }
        } else if (keys.chat && !keys.pharses && keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return radient && (chat || audio) && (all || allies) && !spam;
            }
            return radient && (chat || audio) && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return radient && (chat || audio) && all && !spam;
            }
            return radient && (chat || audio) && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return radient && (chat || audio) && allies && !spam;
            }
            return radient && (chat || audio) && allies;
          }
        } else if (!keys.chat && keys.pharses && keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return radient && (pharses || audio) && (all || allies) && !spam;
            }
            return radient && (pharses || audio) && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return radient && (pharses || audio) && all && !spam;
            }
            return radient && (pharses || audio) && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return radient && (pharses || audio) && allies && !spam;
            }
            return radient && (pharses || audio) && allies;
          }
        } else if (!keys.chat && keys.pharses && !keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return radient && pharses && (all || allies) && !spam;
            }
            return radient && pharses && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return radient && pharses && all && !spam;
            }
            return radient && pharses && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return radient && pharses && allies && !spam;
            }
            return radient && pharses && allies;
          }
        } else if (!keys.chat && !keys.pharses && keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return radient && audio && (all || allies) && !spam;
            }
            return radient && audio && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return radient && audio && all && !spam;
            }
            return radient && audio && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return radient && audio && allies && !spam;
            }
            return radient && audio && allies;
          }
        }
      } else if (!keys.radient && keys.dire) {
        if ((keys.chat && keys.pharses && keys.audio) || (!keys.chat && !keys.pharses && !keys.audio)) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return dire && i.type && (all || allies) && !spam;
            }
            return dire && i.type && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return dire && i.type && all && !spam;
            }
            return dire && i.type && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return dire && i.type && allies && !spam;
            }
            return dire && i.type && allies;
          }
        } else if (keys.chat && !keys.pharses && !keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return dire && chat && (all || allies) && !spam;
            }
            return dire && chat && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return dire && chat && all && !spam;
            }
            return dire && chat && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return dire && chat && allies && !spam;
            }
            return dire && chat && allies;
          }
        } else if (keys.chat && keys.pharses && !keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return dire && (chat || pharses) && (all || allies) && !spam;
            }
            return dire && (chat || pharses) && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return dire && (chat || pharses) && all && !spam;
            }
            return dire && (chat || pharses) && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return dire && (chat || pharses) && allies && !spam;
            }
            return dire && (chat || pharses) && allies;
          }
        } else if (keys.chat && !keys.pharses && keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return dire && (chat || audio) && (all || allies) && !spam;
            }
            return dire && (chat || audio) && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return dire && (chat || audio) && all && !spam;
            }
            return dire && (chat || audio) && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return dire && (chat || audio) && allies && !spam;
            }
            return dire && (chat || audio) && allies;
          }
        } else if (!keys.chat && keys.pharses && keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return dire && (pharses || audio) && (all || allies) && !spam;
            }
            return dire && (pharses || audio) && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return dire && (pharses || audio) && (all || allies) && !spam;
            }
            return dire && (pharses || audio) && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return dire && (pharses || audio) && allies && !spam;
            }
            return dire && (pharses || audio) && allies;
          }
        } else if (!keys.chat && keys.pharses && !keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return dire && pharses && (all || allies) && !spam;
            }
            return dire && pharses && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return dire && pharses && all && !spam;
            }
            return dire && pharses && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return dire && pharses && allies && !spam;
            }
            return dire && pharses && allies;
          }
        } else if (!keys.chat && !keys.pharses && keys.audio) {

          if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {

            if (!keys.spam) {
              return dire && audio && (all || allies) && !spam;
            }
            return dire && audio && (all || allies);
          } else if (keys.all && !keys.allies) {

            if (!keys.spam) {
              return dire && audio && all && !spam;
            }
            return dire && audio && all;
          } else if (!keys.all && keys.allies) {

            if (!keys.spam) {
              return dire && audio && allies && !spam;
            }
            return dire && audio && allies;
          }
        }
      }

      // if ((keys.all && keys.allies) || (!keys.all && !keys.allies)) {
      //   return (all || allies);
      // } else if (keys.all && !keys.allies) {
      //   return all;
      // } else if (!keys.all && keys.allies) {
      //   return allies;
      // }
    });
    return data;
  }

}
