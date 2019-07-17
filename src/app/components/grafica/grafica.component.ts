import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../../providers/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
  public lineChartData: Array<any> = [{ data: [0, 0, 0, 0], label: 'Ventas' }];

  public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril'];

  constructor(private http: HttpClient, private wsService: WebsocketService) {}

  ngOnInit() {
    this.getData();
    this.listenSocket();
  }

  /**
   * Get data from server
   */
  getData(): void {
    this.http.get('http://localhost:3000/chart').subscribe((data: any[]) => (this.lineChartData = data));
  }

  listenSocket() {
    this.wsService.listen('change-chart').subscribe((data: any) => (this.lineChartData = data));
  }
}
