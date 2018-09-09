import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable, isDevMode } from "@angular/core";
import { Observable } from "rxjs";

export interface IExpression {
    expression: string;
    category: string[];
  }

@Injectable()
export class GameService {
  public configUrl = isDevMode() ? "http://localhost:8000" : "https://expressio.herokuapp.com";
  constructor(private http: HttpClient) { }

  public listExpressions(): Observable<HttpResponse<IExpression[]>> {
      return this.http.get<IExpression[]>(
      this.configUrl + "/expressions", { observe: "response" });
  }

  public listExpressionsCategory(category): Observable<HttpResponse<IExpression[]>> {
    return this.http.get<IExpression[]>(
    this.configUrl + "/expressions/list/" + category, { observe: "response" });
  }

  public launchServer() {
    this.http.get(this.configUrl + "/expressions/wakeup").subscribe((d) => {});
  }
}
