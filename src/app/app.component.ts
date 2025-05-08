import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventDashboardComponent } from "./pages/event-dashboard/event-dashboard.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EventDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'event-projection';
}
