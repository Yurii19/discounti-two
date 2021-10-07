import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IDescription } from "../../shared/interfaces";
import { DISCOUNT_URL, FAVORITE_URL, NOT_FAVORITE_URL} from "../../shared/constants";

export const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DescriptionService {
  id: any;

  constructor(private http: HttpClient) {}

  getDescriptionRequest(props: {id: string}) {
    return this.http
      .get(`${DISCOUNT_URL}${props.id}`)
  }

  addToFavoriteRequest(props: { discountId: any }) {
    return this.http
      .post(`${FAVORITE_URL}?discountId=${props.discountId}`, httpOptions)
  }

  removeFromFavoriteRequest(props: { discountId: any }) {
    return this.http
      .delete(`${NOT_FAVORITE_URL}${props.discountId}`, httpOptions)
  }

  handleRemoteDescription(remoteData:any) {

    const localDescription: IDescription = {
      id: remoteData.id,
      name: remoteData.name,
      favorite: remoteData.favorite ? remoteData.favorite : false,
      vendor: remoteData.vendor,
      startTime: remoteData.startTime,
      endTime: remoteData.endTime,
      vendorLocations: remoteData.vendorLocations === null ? [{city:{countryName: '', name: ''},latitude:0, longitude:0}] : remoteData.vendorLocations ,
      tags: [...remoteData.tags.map((el: any)=>{
        return el.name;
      })],
      category: remoteData.category.name,
      active: remoteData.active,
      archived: remoteData.archived,
      description: remoteData.description === null ? 'Default description': remoteData.description,
      percent: remoteData.percent,
      discountImages: remoteData.discountImages.length ? remoteData.discountImages : ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe9r47bhQVcZJ4jEd4wQuYH0LsAz5qKOTBATYRG8c7C3waYKbB2Z1My-HtoY2nzv4XmY&usqp=CAU'],
      promo: remoteData.promo,
      value: remoteData.value,
      discountType: remoteData.discountType
    }
    return localDescription;
  }

}
