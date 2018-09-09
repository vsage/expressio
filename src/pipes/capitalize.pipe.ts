import {Pipe} from "@angular/core";
import {PipeTransform} from "@angular/core";

@Pipe({name: "capitalize"})
export class CapitalizePipe implements PipeTransform {

    public transform(value: any) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }

}
