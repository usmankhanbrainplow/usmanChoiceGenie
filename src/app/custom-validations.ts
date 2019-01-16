import { Directive, HostListener, ElementRef } from '@angular/core'
import { Pipe, PipeTransform } from '@angular/core';

@Directive({
    selector: '[credit-card]'
})
export class CreditCardDirective {
    @HostListener('input', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement
        let trimmed = input.value.replace(/[-]+/g, '')
        if (trimmed.length > 16) {
            trimmed = trimmed.substr(0, 16)
        }
        let numbers = []
        for (let i = 0; i < trimmed.length; i += 4) {
            numbers.push(trimmed.substr(i, 4))
        }
        input.value = numbers.join('-')
    }
}

@Directive({
    selector: '[ssn]'
})
export class SocialSecurityDirective {
    num
    @HostListener('input', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement
        let trimmed = input.value.replace(/[-]+/g, '')
        if (trimmed.length > 9) {
            trimmed = trimmed.substr(0, 9)
        }
        let numbers = []
        for (let i = 0; i < trimmed.length; i += this.num) {
            if (i == 0) { this.num = 3 }
            if (i == 1) { this.num = 3 }
            if (i == 2) { this.num = 3 }
            if (i == 3) { this.num = 2 }
            if (i == 4) { this.num = 2 }
            if (i == 5) { this.num = 4 }
            if (i == 6) { this.num = 4 }
            if (i == 7) { this.num = 4 }
            if (i == 8) { this.num = 4 }
            numbers.push(trimmed.substr(i, this.num))
        }
        input.value = numbers.join('-')
    }
}

@Directive({
    selector: '[phone-no]'
})
export class PhoneNumberDirective {
    num
    finalText: string
    @HostListener('input', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement
        let trimmed = input.value.replace(/[-]+/g, '')
        if (trimmed.length > 10) {
            trimmed = trimmed.substr(0, 10)
        }
        let numbers = []
        for (let i = 0; i < trimmed.length; i += this.num) {
            if (i == 0) { this.num = 3 }
            if (i == 1) { this.num = 3 }
            if (i == 2) { this.num = 3 }
            if (i == 3) { this.num = 3 }
            if (i == 4) { this.num = 3 }
            if (i == 5) { this.num = 3 }
            if (i == 6) { this.num = 4 }
            if (i == 7) { this.num = 4 }
            if (i == 8) { this.num = 4 }
            if (i == 9) { this.num = 4 }
            numbers.push(trimmed.substr(i, this.num))
        }
        input.value = numbers.join('-')
    }
}

@Pipe({
    name: 'highlight'
})
export class HighlightSearch implements PipeTransform {
    transform(value: any, args: any): any {
        var re = new RegExp(args, 'gi')
        return value.replace(re, "<mark>" + args + "</mark>")
    }
}