import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-range-control',
  templateUrl: './range-control.component.html',
  styleUrls: ['./range-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RangeControlComponent),
    multi: true
  }]
})
export class RangeControlComponent implements ControlValueAccessor, AfterViewInit {
  @Input()
  public min: number;
  @Input()
  public max: number;
  public value: number;
  public isDisabled: boolean;

  @ViewChild('input', { static: false })
  private input: ElementRef;
  @ViewChild('track', { static: false })
  private track: ElementRef;
  @ViewChild('fill', { static: false })
  private fill: ElementRef;

  public constructor() {
    this.min = 0;
    this.max = 100;
  }

  public ngAfterViewInit(): void {
    this.updateFillWidth();
    this.updateTrackWidth();
  }

  public writeValue(obj: any): void {
    this.value = obj;
  }

  public registerOnChange(fn: any): void {
    this.onChange = (value) => {
      this.updateFillWidth();
      fn(value);
    };
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.updateFillStyle(isDisabled);
  }

  public onChange(event: any): void { }

  public onTouched(): void { }

  public onMouseDown(): void {
    this.updateFillStyle(true);
  }

  public onMouseUp(): void {
    this.updateFillStyle(false);
  }

  private updateFillWidth(): void {
    this.fill.nativeElement.style.width = this.input.nativeElement.offsetWidth / this.max * this.value + 'px';
  }

  private updateTrackWidth(): void {
    this.track.nativeElement.style.width = this.input.nativeElement.offsetWidth + 'px';
  }

  private updateFillStyle(isActive: boolean): void {
    if (isActive) {
      this.fill.nativeElement.classList.add('active');
    } else {
      this.fill.nativeElement.classList.remove('active');
    }
  }
}
