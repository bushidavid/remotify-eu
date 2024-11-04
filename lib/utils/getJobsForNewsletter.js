import supabase from "../config/supabaseClient";
import { Categories } from "../departments";

export default async function getJobsByCategory() {
    const jobsByCategory = {};

    // Calculate the start of the current week (Monday, 00:00)
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get the current day of the week (0 for Sunday, 1 for Monday, etc.)
    const daysSinceMonday = (dayOfWeek + 6) % 7; // Calculate days since last Monday
    const startOfWeek = new Date(today.setDate(today.getDate() - daysSinceMonday));
    startOfWeek.setHours(0, 0, 0, 0); // Set to the start of the day for an exact match

    // Convert `startOfWeek` to ISO format for Supabase
    const startOfWeekISO = startOfWeek.toISOString();

  
    const { data, error } = await supabase
    .from('job')
    .select(`
        *,
        category:category_id (
        name
        )
    `)
    //.gte('created_at', startOfWeekISO) // Filter to get only jobs created after the start of the week


    if (error) {
    console.error(`Error fetching jobs for category ${category}:`, error);
    return jobsByCategory;
    }


    data.forEach((job) => {
        const categoryName = job.category.name;

        if (!jobsByCategory[categoryName]) {
            jobsByCategory[categoryName] = [];
        }
        jobsByCategory[categoryName].push(job);
    });
  
    return jobsByCategory;
}