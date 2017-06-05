import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service'

@Injectable()
export class MovieService {

  constructor(public http:Http,
              public apiService:ApiService) { }

  public getMovieList() {
    let url = this.apiService.apiUrl.be_movies;
    return this.http
               .get(url)
               .map((res:Response) => {
                 let result = res.json();
                 return result;
               })
               .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getMovieById(id) {
    return {
      "id": "1",
      "name": "速度与激情8",
      "score": 9.4,
      "description": "很好看的一部电影",
      "type": "动作",
      "area": "美国",
      "length": 120,
      "date": "2017-4-20",
      "language": "英语",
      "director": "F·加里·格雷",
      "actors": "范·迪塞尔，杰森·斯坦森，道恩·强森，米歇尔·罗德里格兹，泰瑞斯·吉布森，卢达·克里斯，查理兹·塞隆，库尔特·拉塞尔",
      "introduction": "故事承接《蝙蝠侠大战超人：正义黎明 》，在“神奇女侠”戴安娜惊艳亮相后，布鲁斯·韦恩找到了她当年合照的原版底片，并由此引发她曾经来到人间的故事。戴安娜（盖尔·加朵 饰）是亚马逊一族的公主，生活在天堂岛上。天堂岛是一个纯女人的国度，居民们都长生不老、头脑聪明，且拥有着巨大神力。因为一起意外事件，戴安娜离开家乡，卷入了世界大战。"
    }
  }
}
