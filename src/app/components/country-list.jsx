import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

export default function CountryList({ countries }) {

    // If worldwide, only display "Worldwide" without showing a tooltip or additional countries
    if (countries == '' || countries == null) {
        return <p className="text-sm">Worldwide</p>;
    }

    let fullCountryList = countries.split(', ');

    let displayedCountries = '';
    let fullList = '';

    // Get the first 3 countries and join them with a comma
    if(fullCountryList.length > 3){
        displayedCountries = fullCountryList.slice(0,3).join(', ');
        fullList = fullCountryList.join(', ');
    } else {
        displayedCountries = countries;
    }
    
    return (

       fullCountryList.length > 3 ? 
            (
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="text-sm">{`${displayedCountries}...`}</TooltipTrigger>
                                <TooltipContent className='bg-slate-700 opacity-90 text-white w-48'>
                                    {fullList} 
                                </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            ) :
            (
                <div className="text-left "><p className="text-sm">{displayedCountries}</p></div>
            )
        
    );
}

