import { Component, Input, ElementRef } from "@angular/core";

@Component({
  selector: "app-calendar-slot",
  templateUrl: "./calendar-slot.component.html",
  styleUrls: ["./calendar-slot.component.css"],
})
export class CalendarSlotComponent {
  @Input() consultationLength!: number;
  @Input() consultationType!: string;
  @Input() patientName!: string;
  @Input() patientGender!: string;
  @Input() patientAge!: number;
  @Input() doctorNotes!: string;

  isHovered: boolean = false;
  infoBoxPosition = { x: 0, y: 0 };

  constructor(private elementRef: ElementRef) {}

  showInfo(event: MouseEvent) {
    this.isHovered = true;
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    this.infoBoxPosition = { x: rect.right + 10, y: rect.top };
  }

  hideInfo() {
    this.isHovered = false;
  }

  formatDuration(hour: number): string {
    const displayHour = Math.floor(hour / 2);
    const displayMinutes = hour % 2 == 1 ? " 30min" : "";

    let result = "";
    if (displayHour > 0) {
      result += `${displayHour}h`;
    }
    result += displayMinutes;
    return result;
  }
}
