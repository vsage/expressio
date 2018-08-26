import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable, isDevMode } from "@angular/core";
import { Observable } from "rxjs";

export interface IExpression {
    expression: string;
    category: string[];
  }

@Injectable()
export class GameService {
  public configUrl = "http://localhost:8000";
  constructor(private http: HttpClient) { }

  public listExpressions(): Observable<HttpResponse<IExpression[]>> {
      console.log(isDevMode());
      return this.http.get<IExpression[]>(
      this.configUrl + "/expressions", { observe: "response" });
  }
}
