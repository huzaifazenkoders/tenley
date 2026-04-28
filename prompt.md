in this AssignPropertyModal modal integrate the getPropertiesList with infinite scroll (use react-infinte-scroll component npm lib) and use assign_tenant_property to assign the property
const { data, error } = await supabase.rpc('assign_tenant_property', {
p_tenant_id: tenantId, // uuid (required)
p_property_id: propertyId, // uuid (optional, can be null)
p_unit_id: unitId // uuid (optional, can be null)
});

if (error) {
console.error('Assign tenant failed:', error.message);
} else {
console.log('Tenant assigned successfully:', data);
}
