import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunofPage } from './alunof.page';

describe('AlunofPage', () => {
  let component: AlunofPage;
  let fixture: ComponentFixture<AlunofPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunofPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunofPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
