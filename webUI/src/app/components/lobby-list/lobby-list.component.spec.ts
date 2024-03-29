import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LobbyListComponent } from './lobby-list.component';

describe('LobbyListComponent', () => {
  let component: LobbyListComponent;
  let fixture: ComponentFixture<LobbyListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
