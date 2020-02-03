# define input variables
variable "name" {}
variable "strictly_typed" {
	type = "string"
}

# use other modules
module "my_module" {
	variable_my_module_needs = "something"
}

# define cloud resource(s)
resource "their_name_for_it" "our_name_for_it" {
	parameter0 = "${var.name}_tail_string"
	parameter1 = var.strictly_typed  # avoid "${}" unless formatting strings
	key = "value"
}

# define outputs
output "resource_output_key" {
  value = their_name_for_it.our_name_for_it.key
}

output "module_output_key" {
  value = module.my_module.output_key
}

# use outputs in meta module:
# value = module.name.key
# value = module.name.
