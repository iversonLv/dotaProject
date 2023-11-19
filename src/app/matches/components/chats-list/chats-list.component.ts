import { Component, Input, OnInit } from '@angular/core';
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IChat, IShownChat } from '../../model/onematch';

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

  chatToShow?: IShownChat[] = [];
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
    phrases: {
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

  ngOnInit(): void {
    this.extractData()
    this.chatFilter = Object.keys(this.chatFilterObj);
    this.calFilterDataLength();
  }

  // play audio
  playAudio(item: any): any {
    const audio = new Audio(`https://odota.github.io/media/chatwheel/dota_chatwheel_${item?.key}.${this.chatWheel[item?.key]?.sound_ext}`);
    audio.play();
  }

  // filter chart
  filter(e): any {
    this.extractData()
    this.chatFilterObj = {
      ...this.chatFilterObj,
      [e.source.name]: {
        ...this.chatFilterObj[e.source.name],
        isShown: e.checked
      }
    };
    this.extraceData()
  }

  calFilterDataLength() {
    this.chatFilterObj.radiant.len = this.chats.filter( (chatLine: IChat) => {
      return chatLine.player_slot < 4;
    }).length;

    this.chatFilterObj.dire.len = this.chats.filter( (chatLine: IChat) => {
      return chatLine.player_slot > 4;
    }).length

    this.chatFilterObj.chat.len = this.chats.filter( (chatLine: IChat) => {
      return chatLine.type === 'chat';
    }).length

    this.chatFilterObj.phrases.len = this.chats.filter( (chatLine: IChat) => {
      return chatLine.type === 'chatwheel' && (!this.chatWheel[chatLine?.key]?.sound_ext || !this.chatWheel[chatLine?.key]);
    }).length

    this.chatFilterObj.audio.len = this.chats.filter( (chatLine: IChat) => {
      return chatLine.type === 'chatwheel' && this.chatWheel[chatLine?.key]?.sound_ext;
    }).length

    this.chatFilterObj.all.len = this.chats.filter( (chatLine: IChat) => {
      return chatLine.type === 'chat' || (chatLine.type === 'chatwheel' && this.chatWheel[chatLine?.key]?.all_chat)
    }).length

    this.chatFilterObj.allies.len = this.chats.filter( (chatLine: IChat) => {
      return chatLine.type === 'chatwheel' && !this.chatWheel[chatLine?.key]?.all_chat
    }).length

    this.chatFilterObj.spam.len = this.chats.filter( (chatLine: IChat, index) => {
      return index >= 1
      && (chatLine.time === this.chats[index - 1].time)
      && (chatLine.player_slot === this.chats[index - 1].player_slot)
      && (chatLine.key === this.chats[index - 1].key)
    }).length;
  }

  extractData(): void {
    this.chatToShow = []
    this.chats.forEach((chatEntry: IChat, index: number) => {
      
      //side
      const side = (chatEntry.player_slot<=4)?'radiant':'dire';

      //type
      let chatType: string = ''
      if (chatEntry.type === 'chat') {
        chatType = 'chat';
      } else {
          if (chatEntry.type === 'chatwheel' && (!this.chatWheel[chatEntry?.key]?.sound_ext || !this.chatWheel[chatEntry?.key])) {
          chatType = 'phrases';
        } else if (chatEntry.type === 'chatwheel' && this.chatWheel[chatEntry?.key]?.sound_ext) {
          chatType = 'audio';
        }
      }

      // target
      let targetType = '';
      if (chatEntry.type === 'chat' || (chatEntry.type === 'chatwheel' && this.chatWheel[chatEntry?.key]?.all_chat)) {
        targetType = 'all';
      } else if (chatEntry.type === 'chatwheel' && !this.chatWheel[chatEntry?.key]?.all_chat) {
        targetType = 'allies';
      }

      //spam
      const spam = index >= 1
      && (chatEntry.time === this.chats[index - 1].time)
      && (chatEntry.player_slot === this.chats[index - 1].player_slot)
      && (chatEntry.key === this.chats[index - 1].key);

      this.chatToShow.push({
        chat: chatEntry,
        side,
        chatType: chatType,
        targetType: targetType,
        spam
        // above is common data for player
      });
    })
  }
  
  extraceData() {
    let indexesToRemove: number[] = []
    this.chatToShow.forEach((chatLine: IShownChat, index: number) => {
      let removed = false;
      this.chatFilter.forEach((filter) => {
        switch (filter) {
          case 'radiant':
            if (this.chatFilterObj[filter].isShown == false && chatLine.side == 'radiant') { 
              removed = true
            }
            break;
          case 'dire':
            if (this.chatFilterObj[filter].isShown == false && chatLine.side == 'dire') {
              removed = true
            }
            break;
          case 'chat':
            if (this.chatFilterObj[filter].isShown == false && chatLine.chatType == 'chat') {
              removed = true
            }
            break;
          case 'phrases':
            if (this.chatFilterObj[filter].isShown == false && chatLine.chatType == 'phrases') {
              removed = true
            }
            break;
          case 'audio':
            if (this.chatFilterObj[filter].isShown == false && chatLine.chatType == 'audio') {
              removed = true
            }
            break;
          case 'all':
            if (this.chatFilterObj[filter].isShown == false && chatLine.targetType == 'all') {
              removed = true
            }
            break;
          case 'allies':
            if (this.chatFilterObj[filter].isShown == false && chatLine.targetType == 'allies') {
              removed = true
            }
            break;
          case 'spam':
            if (this.chatFilterObj[filter].isShown == false && chatLine.spam == true) {
              removed = true
            }
            break;
        }
      })
      if (removed) {
        indexesToRemove.push(index)
      }
    })
    this.reformChatToShow(indexesToRemove)
  }

  reformChatToShow(indexesToRemove: number[]) {
    //make indexes in descending order to esnure correct removal
    indexesToRemove.sort((a:number, b:number) => b - a) 

    for (let index of indexesToRemove) {
      this.chatToShow.splice(index,1)
    }
  }
}
