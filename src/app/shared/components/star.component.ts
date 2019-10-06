import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-shared-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StartComponent implements OnChanges {
    @Input() rating: number;
    @Output() notify : EventEmitter<string> = new EventEmitter<string>();
    starWidth: number;
     
    onClick() {
        this.notify.emit(`Product with ${this.rating} Clicked`);
    }

    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
    }
}