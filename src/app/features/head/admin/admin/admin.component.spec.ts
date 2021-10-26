import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call fetch method on click button', () => {
    const spy = spyOn(component, 'receiveUser').and.callFake(() => {
      return EMPTY;
    });
    component.addNewUser();
    expect(spy).toHaveBeenCalled();
  });

  it('userInfo length should be 3', () => {
    const spy = spyOn(component, 'receiveUser').and.callFake(() => {
      return of(['one: 1', 'two: 2', 'three: 3']);
    });
    component.addNewUser();

    expect(component.userInfo.length).toBe(3);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial value of usersNumber should be 0 ', () => {
    component.setOfUsersNumber();
    expect(component.usersNumber).toBe(0);
  });

  it(' newUserName shouldbe empty', () => {
    component.clear();
    expect(component.newUserName).toBe('');
  });

  it(' newUserName shouldbe equals to formcontrol', () => {
    component.inputUser();
    const formControlValue = component.inputUserFC.value;
    expect(component.newUserName).toEqual(formControlValue);
  });

  it('text of button clear should be Clear', () => {
    const btnClear = fixture.debugElement.nativeElement.querySelector('#clear');
    expect(btnClear.innerHTML).toBe('Clear');
  });

  it('formcontrol inputUserFC shouldbe create ', () => {
    expect(component.inputUserFC).toBeTruthy();
  });
});
