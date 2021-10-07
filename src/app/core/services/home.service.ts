import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDiscount } from 'src/app/shared/interfaces';
import { API_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  requestDiscountsData(param: string): Observable<any> {
    const response = this.http.get(`${API_URL}/discounts${param}`);
    return response;
  }

  handleRemoteDiscount(remoteDiscount: any) {
    //  console.log(remoteDiscount);
    if (remoteDiscount.discount) {
      remoteDiscount = remoteDiscount.discount;
    }

    let tags = '';
    remoteDiscount.tags.forEach((el: any) => {
      tags += el.name + ' ';
    });
    const localDiscount: IDiscount = {
      id: remoteDiscount.id,
      name: remoteDiscount.name,
      added: remoteDiscount.startTime,
      vendor: remoteDiscount.vendor.name,
      expired: remoteDiscount.endTime,
      location: 'remoteDiscount',
      tag: tags,
      favorite: remoteDiscount.favorite,
      category: remoteDiscount.category.name,
      isActive: remoteDiscount.active,
      description: remoteDiscount.description,
      percent: (remoteDiscount.value +=
        remoteDiscount.discountType === 'PRICE' ? '%' : ''),
      image: 
      // remoteDiscount.discountImages.length
      //   ? remoteDiscount.discountImages[0].image
      //   : 
        'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
      coordinates: remoteDiscount.vendorLocations
        ? getCoordinates(remoteDiscount)
        : [[50.094, 26.981]],
    };
    return localDiscount;
  }
}

const getCoordinates = (src: any) => {
  let cords = src.vendorLocations;
  let res: any[][] = [];
  cords.map((el: any) => {
    res.push([el.latitude, el.longitude]);
  });
  return res;
};
