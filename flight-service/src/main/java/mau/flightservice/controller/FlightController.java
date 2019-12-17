package mau.flightservice.controller;

import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.web.bind.annotation.*;
import mau.flightservice.model.*;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class FlightController {
	
	private Set<Flight> flights = new HashSet<>();

	@RequestMapping(value = "/flights", method = RequestMethod.GET, produces = "application/json")
	public Set<Flight> firstPage(@RequestParam (required = false) String flightNumber, 
			@RequestParam (required = false) String origin,
			@RequestParam (required = false) String destination,
			@RequestParam (required = false) String arrival) throws ParseException {
		
		flights = createList();
		
		  Iterator<Flight> iterator = flights.iterator();
		  System.out.println(flightNumber + origin); 
		  
		  while (iterator.hasNext()) {
			  
			  Flight vueloRevisar = iterator.next();  
			  
			  String year = vueloRevisar.getArrival().substring(0,4);
			  String month = vueloRevisar.getArrival().substring(5, 7);
			  String day = vueloRevisar.getArrival().substring(8,10);
			
			  System.out.println(year + month + day);
			  
			  String keyVuelo = vueloRevisar.getFlightNumber().toString() + vueloRevisar.getOrigin().toString() 
					  + vueloRevisar.getDestination().toString() + year + month + day;
			  
			  if(!keyVuelo.equals(flightNumber+origin+destination+arrival)) {
				  iterator.remove(); 
				  System.out.println("Seq quitó el :" + vueloRevisar); 
			  } 
		  }
		return flights;
	}
	 
	private static Set<Flight> createList() {
		
		Gson gson = new Gson();
		Type flightListType = new TypeToken<HashSet<Flight>>(){}.getType();
		Set<Flight> flightList = gson.fromJson(Constants.vuelosJSON, flightListType); 
		
		return flightList;
		
	}
}
