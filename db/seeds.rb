
5.times do 
	dept = Department.create(
		name: Faker::Commerce.department(max: 2, fixed_amount: true)
	)
	10.times do
		Item.create(
			department_id: dept.id,
			name: Faker::Commerce.product_name,
			description: Faker::Commerce.color + " " + Faker::Commerce.material,
			price: Faker::Commerce.price
		)
	end
end

puts "Data seeded!"