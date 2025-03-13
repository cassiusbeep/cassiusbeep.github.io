#include <stdio.h>
#include <string.h>

void foo() {
    int buf[2];
    gets(buf);      // Buffer overflow!
    return;
}

int main(void) {
    int amount = 20;
    foo();
    send_money(amount);
    return 0;
}


// #include <stdlib.h>
// #include <stdio.h>
// #include <string.h>

// char *allocate_string(int string_length)
// {
//     int actual_string_length = string_length + 1;

//     char *string = malloc(actual_string_length);

//     // HERE
//     return string;
// }

// int main()
// {
//     const char *string_to_print = "testing";

//     char *string_allocation = allocate_string(Strlen(string_to_print));

//     strcpy(string_allocation, string_to_print);

//     printf("%s\n", string_allocation);

//     free(string_allocation);

//     return 0;
// }