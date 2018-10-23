import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesbygenreComponent } from './gamesbygenre.component';

describe('GamesbygenreComponent', () => {
  let component: GamesbygenreComponent;
  let fixture: ComponentFixture<GamesbygenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesbygenreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesbygenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
